import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import CommunityDashboard from "@/components/CommunityDashboard";

export default function DashboardPage() {
  return (
    <>
      <AppHeader activePage="dashboard" />
      <main className="w-full max-w-screen-xl mx-auto px-5 pt-6 md:pt-8 pb-20 md:pb-12">
        <CommunityDashboard />
      </main>
      <AppFooter />
      <BottomNavigation activePage="dashboard" />
    </>
  );
}
