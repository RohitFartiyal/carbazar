import { SettingsForm } from "./_components/settings-form"

export const metadata = {
  title: "Settings | CarBazar Admin",
  description: "Manage cars in your website",
}

const SettingPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <SettingsForm/>
    </div>
  )
}
export default SettingPage