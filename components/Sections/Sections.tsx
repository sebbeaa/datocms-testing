import Blog from '../Blog';
import Brands from '../Home/Brands';
import Features from '../Home/Features';
import Hero from '../Home/Hero';
import Pricing from '../Home/Pricing';
import Testimonials from '../Home/Testimonials';
import Video from '../Home/Video';
import DetailSection from '../Home/Detail/DetailSection';
import CompactTeam from '../About/CompactTeam';
import ExpandedTeam from '../About/ExpandedTeam';
import FAQAccordion from '../About/FAQAccordion';
import FAQGrid from '../About/FAQGrid';
import StatsSection from '../About/StatsSection';
import AboutIntro from '../About/AboutIntro';
import {
  AboutIntroRecord,
  BrandSectionRecord,
  DetailSectionRecord,
  FaqSectionRecord,
  FeatureListSectionRecord,
  FeaturedPostsSectionRecord,
  HeroSectionRecord,
  PageModelSectionsField,
  PricingSectionRecord,
  ReviewSectionRecord,
  SiteLocale,
  StatsSectionRecord,
  TeamSectionRecord,
  VideoSectionRecord,
} from '@/graphql/generated';

type Props = {
  sections: Array<PageModelSectionsField>;
  locale: SiteLocale;
};

export default function Section({ sections, locale }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section._modelApiKey) {
          case 'hero_section':
            const heroSectionRecord = section as HeroSectionRecord;
            return (
              <Hero
                heroTitle={heroSectionRecord.heroTitle}
                heroSubtitle={heroSectionRecord.heroSubtitle}
                buttons={heroSectionRecord.buttons}
              />
            );
          case 'feature_list_section':
            const featureListSectionRecord =
              section as FeatureListSectionRecord;
            return (
              <Features
                features={featureListSectionRecord.feature}
                featuresHeader={featureListSectionRecord.featuresHeader}
                featuresSubheader={featureListSectionRecord.featuresSubheader}
              />
            );
          case 'video_section':
            const videoSectionRecord = section as VideoSectionRecord;
            return (
              <Video
                videoHeader={videoSectionRecord.videoHeader}
                videoSubheader={videoSectionRecord.videoSubheader}
                videoUid={videoSectionRecord.video?.providerUid}
                videoThumbnail={videoSectionRecord.video?.thumbnailUrl}
                videoProvider={videoSectionRecord.video?.provider}
              />
            );
          case 'brand_section':
            const brandSectionRecord = section as BrandSectionRecord;
            return <Brands brandShowcase={brandSectionRecord.brand} />;
          case 'detail_section':
            const detailSectionRecord = section as DetailSectionRecord;
            return (
              <DetailSection
                imagePosition={detailSectionRecord.imagePosition as boolean} //to ask: why is this boolean filed typed as any?
                imageURL={detailSectionRecord.image.url}
                details={detailSectionRecord.details}
              />
            );
          case 'review_section':
            const reviewSectionRecord = section as ReviewSectionRecord;
            return (
              <Testimonials
                header={reviewSectionRecord.reviewSectionHeader}
                subheader={reviewSectionRecord.reviewSectionSubheader}
                reviews={reviewSectionRecord.review}
              />
            );
          case 'pricing_section':
            const pricingSectionRecord = section as PricingSectionRecord;
            return (
              <Pricing
                header={pricingSectionRecord.pricingSectionHeader}
                subheader={pricingSectionRecord.pricingSectionSubheader}
                plans={pricingSectionRecord.plans}
              />
            );
          case 'featured_posts_section':
            const featuredPostsSectionRecord =
              section as FeaturedPostsSectionRecord;
            return (
              <Blog
                locale={locale}
                blogData={featuredPostsSectionRecord.featuredPosts}
                blogHeader={featuredPostsSectionRecord.featuredPostsHeader}
                blogSubheader={
                  featuredPostsSectionRecord.featuredPostsSubheader
                }
              />
            );
          case 'team_section':
            const teamSectionRecord = section as TeamSectionRecord;
            if (teamSectionRecord.displayOptions === 'compact')
              return (
                <CompactTeam
                  header={teamSectionRecord.title}
                  subheader={teamSectionRecord.subtitle}
                  members={teamSectionRecord.showcasedMembers}
                  lng={locale}
                />
              );
            return (
              <ExpandedTeam
                header={teamSectionRecord.title}
                subheader={teamSectionRecord.subtitle}
                members={teamSectionRecord.showcasedMembers}
                lng={locale}
              />
            );
          case 'faq_section':
            const faqSectionRecord = section as FaqSectionRecord;
            if (faqSectionRecord.displayOptions === 'accordion')
              return (
                <FAQAccordion
                  title={faqSectionRecord.title}
                  subtitle={faqSectionRecord.subtitle}
                  questions={faqSectionRecord.questions}
                />
              );
            return (
              <FAQGrid
                title={faqSectionRecord.title}
                subtitle={faqSectionRecord.subtitle}
                questions={faqSectionRecord.questions}
              />
            );
          case 'stats_section':
            const statsSectionRecord = section as StatsSectionRecord;
            return (
              <StatsSection
                title={statsSectionRecord.title}
                subtitle={statsSectionRecord.subtitle}
                statistic={statsSectionRecord.statistic}
              />
            );
          case 'about_intro':
            const aboutIntroSectionRecord = section as AboutIntroRecord;
            return (
              <AboutIntro
                header={aboutIntroSectionRecord.header}
                subheader={aboutIntroSectionRecord.subheader}
                introduction={aboutIntroSectionRecord.introductionText}
                images={aboutIntroSectionRecord.images}
                preHeader={aboutIntroSectionRecord.preHeader}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}
