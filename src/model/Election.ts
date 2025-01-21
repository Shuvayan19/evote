import mongoose, { Schema, Document } from "mongoose";

interface Candidate {
  Candidate_Name: string;
  party_img: string;
  votes:number;
}

export interface Election extends Document {
  ElectionName: string;
  NoC: number;
  Candidates: Candidate[];
  Duration: number;
  parentId: string;
  isStrict: boolean;
  roomkey: number;
}

const electionSchema = new Schema<Election>({
  ElectionName: {
    type: String,
    required: false,
    default: "Vote",
  },
  NoC: {
    type: Number,
    min: [2, "atleast 2 candidates are needed to create election"],
    max: [8, "atmax 8 candidates are allowed to contest the election"],
  },
  Candidates: [
    {
      Candidate_Name: {
        type: String,
        required: true,
      },
      party_img: {
        type: String,
        required: false,
      },
      votes:{
        type:Number,
        default:0,
        required:true
      }
    },
  ],
  Duration: {
    type: Number,
    required: false,
    default: 10,
  },
  parentId: {
    type: String,
    required: true,
  },
  isStrict: {
    type: Boolean,
    required: true,
    default: false,
  },
  roomkey: {
    type: Number,
    required: true,
    unique: true,
  },
});

//server side hook to generate roomkey
electionSchema.pre("save", async function (next) {
  if (!this.roomkey) {
    let roomkey;
    do {
      roomkey = Math.floor(100000 + Math.random() * 900000);
    } while (mongoose.models.Election.exists({ roomkey }));
    this.roomkey = roomkey;
  }
  next();
});

const ElectionModel =
  (mongoose.models.Election as mongoose.Model<Election>) ||
  mongoose.model("Election", electionSchema);

export default ElectionModel;
