import prisma from "@/components/prisma"
import Layout from "@/components/layout/layout"
import SearchBar from "@/components/searchbar"
import ShowImagesNext from "@/components/showImages"
import Pagination from "@/components/searchPage/Pagination"
import Router from "next/router"

export default function Index({ filterdImages, categories, totalImages }) {
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
    let photos;
    let totalImages;

    const commonConditions = {
        OR: [
            { size: "thumb" },
            { size: "small-wm" }
        ],
        exclusive: false
    };

    try {
        let category;
        if (categorie !== "All categories") {
            category = await prisma.categories.findFirst({
                where: { name: decodeURIComponent(categorie) },
                select: { id: true }
            });

            if (!category) {
                throw new Error(`Category: ${categorie} not found.`);
            }
            photos = await prisma.photos.findMany({
                where: {
                    ...commonConditions,
                    categoriesId: category.id
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            totalImages = await prisma.photos.count({
                where: {
                    ...commonConditions,
                    categoriesId: category.id
                }
            });

        } else {
            photos = await prisma.photos.findMany({
                where: commonConditions,
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
        
            // Count total images with only common conditions
            totalImages = await prisma.photos.count({
                where: commonConditions
            });
        }

        const filterCondition = image =>
            image.tags
            && Array.isArray(image.tags)
            && image.tags.some(tag =>
                typeof tag === 'string'
                && (tag.toLowerCase().includes(searchPhrase?.toLowerCase() || "")
                    || (searchPhrase?.toLowerCase() || "").includes(tag.toLowerCase()))
            );

        const filterdImages = searchPhrase ? photos.filter(filterCondition) : photos;

        const categoriesAll = await prisma.categories.findMany({
            select: { id: true, name: true }
        });

        return {
            props: { filterdImages, categories: categoriesAll, totalImages }
        };
    } catch (error) {
        const categoriesAll = await prisma.categories.findMany({
            select: { id: true, name: true }
        });
        console.error(error);
        return {
            props: { filterdImages: [], categories: categoriesAll, totalImages: 0 }
        };
    } finally {
        prisma.$disconnect();
    }
}
