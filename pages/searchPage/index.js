import prisma from "@/components/prisma"
import Layout from "@/components/layout/layout"
import SearchBar from "@/components/searchPage/searchbar"
import ShowImagesNext from "@/components/showImages"
import Pagination from "@/components/searchPage/Pagination"
import { useRouter } from "next/router"

export default function Index({ filterdImages, categories, totalImages }) {
    const Router = useRouter()
    const currentPage = parseInt(Router.query.page) || 1;
    const totalPages = Math.ceil(totalImages / 20);

    return (
        <Layout>
            <div className="flex justify-center items-center mt-36">
                <SearchBar categories={categories} />
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
            <ShowImagesNext photos={filterdImages} />
            

        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { searchPhrase, categorie, page = 1 } = context.query;
    const pageSize = 20;

    // Common conditions for all queries
    const commonConditions = {
        OR: [
            { size: "thumb" },
            { size: "small-wm" }
        ],
        exclusive: false
    };

    try {
        let categoryCondition = {};
        if (categorie && categorie !== "All categories") {
            const category = await prisma.categories.findFirst({
                where: { name: decodeURIComponent(categorie) },
                select: { id: true }
            });

            if (category) {
                categoryCondition = { categoriesId: category.id };
            }
        }

        // Fetch photos without search condition
        let photos = await prisma.photos.findMany({
            where: {
                ...commonConditions,
                ...categoryCondition
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        // Fetch total count without search condition
        let totalCount = await prisma.photos.count({
            where: {
                ...commonConditions,
                ...categoryCondition
            },
        });

        // Manual filter for tags if searchPhrase is provided
        if (searchPhrase) {
            const allPhotos = await prisma.photos.findMany({
                where: {
                    ...commonConditions,
                    ...categoryCondition
                },
            });
            const filteredPhotos = allPhotos.filter(photo =>
                photo.tags &&
                photo.tags.some(tag => tag.toLowerCase().includes(searchPhrase.toLowerCase()))
            );
            totalCount = filteredPhotos.length; // Update total count based on filtered photos
            // Filter the photos for the current page
            photos = filteredPhotos.slice((page - 1) * pageSize, page * pageSize);
        }

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / pageSize);

        // Fetch all categories
        const categoriesAll = await prisma.categories.findMany({
            select: { id: true, name: true }
        });

        return {
            props: {
                filterdImages: photos,
                categories: categoriesAll,
                totalImages: totalCount, // Total count of filtered images
                totalPages // Total number of pages
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                filterdImages: [],
                categories: [],
                totalImages: 0,
                totalPages: 0
            }
        };
    } finally {
        await prisma.$disconnect();
    }
}