import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import CommunityDashboard from "@/components/CommunityDashboard";

export default function DashboardPage() {
  return (
    <>
      <AppHeader activePage="dashboard" />
      <main className="w-full max-w-screen-xl mx-auto px-5 pt-6 md:pt-8 pb-28 md:pb-8">
        <CommunityDashboard />
      </main>
      <BottomNavigation activePage="dashboard" />
    </>
  );
}
