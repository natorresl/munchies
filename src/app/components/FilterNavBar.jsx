export default async function FilterNavBar() {

 const data = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/restaurants')
 const restaurants = await data.json()
 console.log(restaurants)

  return (  
<nav className="w-1/6 card-style px-6 py-4 flex flex-col min-w-36 w-60">
          <h2 className=" text-2xl">Filter</h2>

          <h3 className="text-xs text-gray-400 tex-bold mt-8 mb-4">FOOD CATEGORY</h3>
          <ul className="flex flex-col gap-2 ">

              <button className="button-style">Hamburger</button>
              <button className="button-style">Pizza</button>
              <button className="button-style">Tacos</button>
              <button className="button-style">Coffee</button>
          </ul>
              <h3 className="text-xs text-gray-400 tex-bold mt-8 mb-4">DELIVERY TIME</h3>
          <ul className="flex flex-wrap gap-2">
            
              <button className="button-style">0-10 min</button>
              <button className="button-style">10-30 min</button>
              <button className="button-style">30-60 min</button>
              <button className="button-style">1 hour+</button>
          </ul>
             <h3 className="text-xs text-gray-400 tex-bold mt-8 mb-4">PRICE RANGE</h3>
            <ul className="flex flex-wrap gap-2 ">
            
              <button className="button-style p-2">$</button>
              <button className="button-style p-2">$$</button>
              <button className="button-style p-2">$$$</button>
              <button className="button-style p-2">$$$$</button>
    
          </ul>
      
        </nav>
  )}