import { CarsList } from "./_components/car-list";


export const metadata = {
    title: "Cars | CarBazar Admin",
    description: "Manage cars in your website",
}

const CarsPage = () => {
  return (
    <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Car Management</h1>
        <CarsList/>
    </div>
  )
}
export default CarsPage;