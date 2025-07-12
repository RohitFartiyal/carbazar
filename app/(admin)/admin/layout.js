
import { getAdmin } from "@/actions/admin";
import Header from "@/components/header";
import { notFound } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

const AdminLayout = async({children}) => {

    const admin = await getAdmin();

    if(!admin.authorized){
        return notFound();
    }
  return (
    <div className="h-full">
        <Header isAdminPage={true}/>
        <div className="flex md:h-full h-0 bg-amber-300 w-56 flex-col top-20 fixed inset-y-0 z-50">
          <Sidebar/>
        </div>

        <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  )
}
export default AdminLayout