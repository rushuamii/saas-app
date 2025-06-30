import CompanionCard from "@/components/CompanionCard";
import { Button } from "@/components/ui/button";
import React from "react";
import CompanionSession from "./companions/[id]/page";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import Hero from "@/components/hero";
import AboutUs from "./my-journey/about-us/page";
import Footer from "@/components/Footer";

// 🛠️ Tell Next.js this is a dynamic (server-rendered) page
export const dynamic = "force-dynamic";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <Hero />
      <h1>Popular Companions</h1>
      <section className="home-section">
        {companions.map((compnaion) => (
          <CompanionCard
            key={compnaion.id}
            {...compnaion}
            color={getSubjectColor(compnaion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
      <Footer />
    </main>
  );
};

export default Page;
