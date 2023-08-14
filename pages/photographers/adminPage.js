import { useRouter } from "next/router";
import { toast } from "react-toastify";
import prisma from "@/components/prisma";
import AddNewPhotographer from "@/components/addNewPhotographer";
import AddNewCategory from "@/components/addNewCategory";

export default function AdminPage({photographers, categories}) {

  

  return (
    <div className="bg-custom-grey min-h-screen flex flex-col justify-center items-center px-6 md:px-24">

    
    <AddNewPhotographer photographers={photographers}/>
    <AddNewCategory categories={categories}/>
    

  </div>
  );
}


export async function getServerSideProps(context) {
  
  try {
   
    const photographers = await prisma.photographer.findMany()
    const categories = await prisma.categories.findMany()

   
    return {
      props: { 
        photographers,
        categories: JSON.parse(JSON.stringify(categories))
      }
    }

  } catch (error) {
    console.log(error)
    return {
        props: { 
          photographers: [],
          categories: []
        }  // you should return an object in every condition
    }
  } finally {
    await prisma.$disconnect()
  }

}
