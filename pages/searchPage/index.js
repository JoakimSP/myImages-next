import prisma from "@/components/prisma"
import Layout from "@/components/layout/layout"
import SearchBar from "@/components/searchbar"
import ShowImagesNext from "@/components/showImages"

export default function Index({ filterdImages, categories }) {
    console.log(filterdImages)

    return (
        <Layout>
            <div className="flex justify-center items-center mt-36">
                <SearchBar categories={categories}/>
            </div>
            <ShowImagesNext photos={filterdImages}/>

        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { searchPhrase, categorie } = context.query;
    let photos;

    try {
        let category;

        if (categorie !== "All categories") {
            category = await prisma.categories.findFirst({
                where: { name: categorie },
                select: { id: true }
            });

            if (!category) {
                throw new Error(`Category: ${categorie} not found.`);
            }

            photos = await prisma.photos.findMany({
                where: {
                    categoriesId: category.id
                }
            });
        } else {
            photos = await prisma.photos.findMany();
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
            props: { filterdImages, categories: categoriesAll }
        };
    } catch (error) {
        console.error(error);
        return {
            props: { filterdImages: [], categories: [] }
        };
    } finally {
        prisma.$disconnect();
    }
}
