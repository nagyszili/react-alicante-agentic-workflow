import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Box, Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      {/* Both getTranslations and useTranslations pull in request data that
          blocks this route's Cache Components prerendering (confirmed:
          `pnpm build` fails with "uncached or runtime data during
          prerendering" either way) — the same reason every other content
          page (stats, sessions, news) hardcodes its heading copy in English
          rather than routing it through next-intl. Follows that convention. */}
      <PageHeading title="Speakers">
        Every speaker at React Alicante, and the sessions they&apos;re giving.
      </PageHeading>

      <Grid
        as="ul"
        gap="4"
        listStyleType="none"
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      >
        {speakers.map(({ speaker, sessions: speakerSessions }) => (
          <Box as="li" key={speaker}>
            <SpeakerCard speaker={speaker} sessions={speakerSessions} />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}
