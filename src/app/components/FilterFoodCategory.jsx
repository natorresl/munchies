import Image from "next/image"


export default async function FilterFoodCategory() {

     const data = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/filter')
 const response = await data.json()
 const filters = response.filters
 console.log(filters)

  return ( 

<section className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-x-auto  text-sm">
    <ul className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-x-auto  text-sm">
      {filters.map((filter) => (
        <button key={filter.id}
        className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative cursor-pointer"
        >
         <h3 className="pt-4 pl-3">{filter.name}</h3>
            <Image
              src={`${filter.image_url}`}
              alt="Hamburger Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
           
        
            />
        </button>
      ))}
    </ul>  
        </section>

   )}
