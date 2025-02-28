import mongoose, { Schema, Document } from "mongoose";

export interface Candidate {
  _id: any;
  Candidate_Name: string;
  party_img: string|null;
  color?: string;
  isUrl?:boolean
  votes: number;
}

export interface Election extends Document {
  ElectionName: string;
  ElectionDesc: string;
  NoC: number;
  Candidates: Candidate[];
  VoterList: string[];
  Duration: number;
  isActive:boolean;
  parentMail: string;
  isStrict: boolean;
  roomkey: number;
}

const electionSchema = new Schema<Election>({
  ElectionName: {
    type: String,
    required: false,
    default: "Vote",
  },
  ElectionDesc: {
    type: String,
    required: false,
    default: "Vote for your favourite candidate",
  },
  NoC: {
    type: Number,
    min: [2, "atleast 2 candidates are needed to create election"],
    max: [8, "atmax 8 candidates are allowed to contest the election"],
  },
  VoterList: {
    type:[String],
  },
  Candidates: [
    {
      Candidate_Name: {
        type: String,
        required: true,
      },
      party_img: {
        type: String,
        default: null,
        required: false,
      },
      isUrl:{ type : Boolean,required:false},
      color: { type: String, required: false },
      votes: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
  Duration: {
    type: Number,
    required: false,
    default: 10,
  },
  parentMail: {
    type: String,
    required: true,
  },
  isStrict: {
    type: Boolean,
    required: true,
    default: false,
  },
  isActive:{
    type:Boolean,
    required:true,
    defautl:true,
  },
  roomkey: {
    type: Number,
    required: true,
    unique: true,
  },
},{timestamps:true});

//server side hook to generate roomkey
// electionSchema.pre("save", async function (next) {
//   if (!this.roomkey) {
//     let roomkey;
//     do {
//       roomkey = Math.floor(100000 + Math.random() * 900000);
//     } while (await mongoose.models.Election.exists({ roomkey }));
//     this.roomkey = roomkey;
//     console.log("roomkey is : ",this.roomkey)
//   }

//   next();
// });

const ElectionModel =
  (mongoose.models.Election as mongoose.Model<Election>) ||
  mongoose.model("Election", electionSchema);

export default ElectionModel;
