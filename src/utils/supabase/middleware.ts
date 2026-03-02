import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, response?: NextResponse) {
    try {
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

            // Roles allowed in the admin pane
            const role = user.user_metadata?.role;
            const status = user.user_metadata?.status;
            const isAdmin = role === 'admin';
            const isEditor = role === 'editor';
            const isBlocked = status === 'blocked';

            console.log("Middleware Role Check:", { userId: user.id, role, status });

            // If user has no valid role or is blocked, redirect to home
            if ((!isAdmin && !isEditor) || isBlocked) {
                console.error("Middleware: Not Admin or Editor, or Blocked. Redirecting to /");
                const url = request.nextUrl.clone()
                url.pathname = '/'
                const redirectResponse = NextResponse.redirect(url)
                const cookies = supabaseResponse.cookies.getAll()
                cookies.forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie))
                return redirectResponse
            }

            // Route-level restrictions for editors
            const currentPath = request.nextUrl.pathname;
            const restrictedForEditors = [
                '/admin/team',
                '/admin/settings',
                '/admin/agents',
                '/admin/rag',
                '/admin/leads'
            ];

            if (isEditor && restrictedForEditors.some(route => currentPath.startsWith(route))) {
                console.error("Middleware: Editor attempting to access restricted route, Redirecting to /admin");
                const url = request.nextUrl.clone()
                url.pathname = '/admin'
                const redirectResponse = NextResponse.redirect(url)
                const cookies = supabaseResponse.cookies.getAll()
                cookies.forEach(cookie => redirectResponse.cookies.set(cookie.name, cookie.value, cookie))
                return redirectResponse
            }
        }

        return supabaseResponse
    } catch (error) {
        console.error("Middleware Error caught:", error);
        return response ?? NextResponse.next({ request });
    }
}
