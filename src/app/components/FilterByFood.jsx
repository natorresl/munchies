import Image from "next/image"

export default function FilterByFood() {
  return ( 

<section className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-hidden text-sm">
      <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 pl-3">Hamburgers</h3>
            <Image
              src="/images/hamburger.png"
              alt="Hamburger Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
           
        
            />
          </div>
          <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 pl-3">Pizza</h3>
              <Image
              src="/images/pizza.png"
              alt="Pizza Icon"
              width={80}
              height={80}
              className="overflow-hidden absolute left-22"
        
            />
          </div>
        <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 px-3">Tacos</h3>
             <Image
              src="/images/taco.png"
              alt="Taco Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
        
            />
          </div>
          <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 px-3">Coffee</h3>
                <Image
              src="/images/coffee.png"
              alt="Coffee Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
        
            />
          </div>
         <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 px-3">Fries</h3>
                 <Image
              src="/images/Fries.png"
              alt="Fries Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
        
            />
          </div>
             <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 px-3">Mexican</h3>
                 <Image
              src="/images/burrito.png"
              alt="Egg and Bacon Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
        
            />
          </div>
         <div className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative">
            <h3 className="pt-4 px-3">Breakfast</h3>
                 <Image
              src="/images/breakfast.png"
              alt="Egg and Bacon Icon"
              width={80}
              height={80}
                className="overflow-hidden absolute left-22"
        
            />
          </div>
       
        </section>

   )}
