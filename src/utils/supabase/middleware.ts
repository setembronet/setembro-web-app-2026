import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, response?: NextResponse) {
    let supabaseResponse = response ?? NextResponse.next({
        request,
    })

    console.log('Middleware Env Check:', {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            console.error("Middleware: No User, Redirecting to /login");
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            const redirectResponse = NextResponse.redirect(url)
            // Copy cookies from supabaseResponse to redirectResponse
            const cookies = supabaseResponse.cookies.getAll()
            cookies.forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie))
            return redirectResponse
        }

        // Check for Admin Role using user_metadata
        // This avoids a DB query and potential RLS issues in middleware
        const role = user.user_metadata?.role;

        console.log("Middleware Admin Check:", { userId: user.id, role });

        // If no role or not admin, redirect to home
        if (role !== 'admin') {
            console.error("Middleware: Not Admin (Metadata check), Redirecting to /");
            const url = request.nextUrl.clone()
            url.pathname = '/'
            const redirectResponse = NextResponse.redirect(url)
            // Copy cookies from supabaseResponse to redirectResponse
            const cookies = supabaseResponse.cookies.getAll()
            cookies.forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie))
            return redirectResponse
        }
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new Response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    return supabaseResponse
}
