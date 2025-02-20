"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Candidate } from "@/model/Election";
import { set } from "mongoose";
import UserIcon from "@/component/userIcon";
import { useSession } from "next-auth/react";
import { AnimatedButton } from "@/component/AnimatedButton";

export default function VotingArea({
  roomId,
  candidates,
}: {
  roomId: string;
  candidates: Candidate[];
}) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleVote = async () => {
    if (!selectedCandidate) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cast-Vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomkey: roomId,
          Candidate_Name: selectedCandidate,
          email: session?.user?.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Vote Submitted",
          description: "Your vote has been successfully recorded.",
        });
        router.push("/vote/success");
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description:
          "An error occurred while submitting your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(candidates);
  return (
    <div>
      <div className="grid grid-cols-1 m-3 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {candidates.map((candidate) => (
          <motion.div
            key={candidate.Candidate_Name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer shadow-md hover:shadow-[0_4px_15px_0_var(--candidate-color)] ${selectedCandidate === candidate.Candidate_Name ? "border-2 border-teal-700" : ""}`}
              style={{
                //@ts-expect-error
                "--candidate-color": candidate.color,
              }}
              onClick={() => setSelectedCandidate(candidate.Candidate_Name)}
            >
              <CardContent
                className={`flex items-center ${
                  candidate.party_img
                    ? "p-6 flex-col gap-4"
                    : "p-4 justify-center"
                }`}
              >
                <div
                  className={`${candidate.party_img ? "w-32 h-32" : "w-16 h-20"} mb-4 relative flex items-center justify-center`}
                >
                  {candidate.party_img ? (
                    <Image
                      src={candidate.party_img}
                      alt={candidate.Candidate_Name}
                      fill
                      className="rounded-full object-cover"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  ) : (
                    <UserIcon color={candidate.color || "black"} />
                  )}
                </div>
                <h3
                  className={
                    candidate.party_img
                      ? "text-xl font-semibold  text-center"
                      : "text-2xl"
                  }
                  style={{
                    color: candidate.color || "black",
                    textShadow: "1px 1px 1px black",
                  }}
                >
                  {candidate.Candidate_Name}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        <AnimatedButton
          onClick={handleVote}
          disabled={!selectedCandidate || isSubmitting}
          isSubmitting={isSubmitting}
          selectedCandidate={selectedCandidate}
          candidateColor={
            candidates.find((c) => c.Candidate_Name === selectedCandidate)
              ?.color || "#0f766e"
          }
        />
      </div>
    </div>
  );
}
