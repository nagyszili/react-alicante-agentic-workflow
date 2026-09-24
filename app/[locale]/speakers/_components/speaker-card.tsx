import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: string;
  sessions: Session[];
}

export function SpeakerCard({ speaker, sessions }: SpeakerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle fontSize="md">{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex
                justify="space-between"
                align="baseline"
                gap="3"
                color="var(--text-primary)"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text truncate>{session.title}</Text>
                <Text color="var(--text-muted)" flexShrink="0" fontSize="sm">
                  {session.startTime}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
