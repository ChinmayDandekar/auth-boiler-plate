    import { NextRequest, NextResponse } from "next/server";


    export const POST = async(req:NextRequest):Promise<NextResponse> => {
        try {
            const { email, password } = await req.json()
            console.log(email, password)


            ``




            return NextResponse.json({ success:true, email, password})

        } catch (error: unknown) {
            console.log(error)
            const errorMsg = error instanceof Error? error.message : "Unknown error occured!"
            return NextResponse.json({success:false, message:errorMsg},{status:201})
        }
    }