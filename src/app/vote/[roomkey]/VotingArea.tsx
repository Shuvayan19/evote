"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Candidate } from "@/model/Election"

export default function VotingArea({ roomId, candidates }: { roomId: string; candidates: Candidate[] }) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleVote = async () => {
    if (!selectedCandidate) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomkey: roomId,
          Candidate_Name: selectedCandidate,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Vote Submitted",
          description: "Your vote has been successfully recorded.",
        })
        router.push("/vote/success")
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while submitting your vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {candidates.map((candidate) => (
          <motion.div key={candidate.Candidate_Name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              className={`cursor-pointer ${
                selectedCandidate === candidate.Candidate_Name ? "ring-2 ring-emerald-500" : ""
              }`}
              onClick={() => setSelectedCandidate(candidate.Candidate_Name)}
            >
              <CardContent className="p-4">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                  <Image
                    src={candidate.party_img || "/placeholder.svg"}
                    alt={candidate.Candidate_Name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{candidate.Candidate_Name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleVote} disabled={!selectedCandidate || isSubmitting} className="w-full max-w-md">
          {isSubmitting ? "Submitting Vote..." : "Submit Vote"}
        </Button>
      </div>
    </div>
  )
}

