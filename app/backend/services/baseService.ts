import { NextResponse } from "next/server";
import {empty} from "../utils/data-check";
import { ReturnDataType } from "./types";

class BaseService {
    static sendFailedResponse(data: any) {
        const returnData: ReturnDataType = { success: false };
        if (!empty(data) || data === "0" || data === 0 || data === "") {
          returnData.data = data;
        }
        return NextResponse.json(returnData);
      }
    static sendSuccessResponse(data: any) {
        const returnData: ReturnDataType = { success: true };
        if (!empty(data) || data === "0" || data === 0 || data === "") {
          returnData.data = data;
        }
        return NextResponse.json(returnData);
      }
}

export default BaseService;