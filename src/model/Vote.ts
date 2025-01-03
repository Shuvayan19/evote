import mongoose, { Schema, Document } from "mongoose";

export interface Vote extends Document {
  UserId: mongoose.Schema.Types.ObjectId; //voter's info who casted this vote
  ElectionId: mongoose.Schema.Types.ObjectId; //election info where the vote was casted
  CandidateId: string; //candidate's info to whom the vote was casted
}

const voteSchema = new Schema<Vote>({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ElectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },
  CandidateId: {
    type: String,
    required: true,
  },
});

const VoteModel =
  (mongoose.models.Vote as mongoose.Model<Vote>) ||
  mongoose.model("Vote", voteSchema);

export default VoteModel;
