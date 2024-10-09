import axios from "@/axios";
import { User } from "@/models/user.model";
import { AxiosResponse } from "axios";

export async function authenticationApi(): Promise<AxiosResponse<User>> {
  const response = await axios.get("/authentication");
  return response;
}
