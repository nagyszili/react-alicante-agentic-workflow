import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: string;
  sessions: Session[];
}

export function SpeakerCard({ speaker, sessions }: SpeakerCardProps) {
  return (
    <Card>
      <CardHeader>
        {/* h1 (PageHeading) has no h2 between it and this card's title on the
            Speakers page, so this stays at h2 rather than Card.Title's
            default h3 — otherwise the heading levels skip from 1 to 3. */}
        <CardTitle as="h2" fontSize="md">
          {speaker}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="2" listStyleType="none">
          {sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  justify="space-between"
                  align="baseline"
                  gap="3"
                  color="var(--text-primary)"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  <Text truncate title={session.title}>
                    {session.title}
                  </Text>
                  <Text
                    as="span"
                    color="var(--text-secondary)"
                    flexShrink="0"
                    fontSize="sm"
                  >
                    · {session.startTime}
                  </Text>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
