module.exports = [
"[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://gpgeexulpyuwomgfcpfl.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_fUkyxILv3lYC8lySFVvapg_GNRD1lIi"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/src/lib/ai/gemini.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/ai/gemini.ts
__turbopack_context__.s([
    "generateEmbedding",
    ()=>generateEmbedding
]);
async function generateEmbedding(text) {
    if (!text || text.trim() === '') return null;
    // Note: In Next.js Server Actions, process.env is securely available.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("GEMINI_API_KEY is not set. Embedding generation will fail.");
        return null;
    }
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "models/text-embedding-004",
                content: {
                    parts: [
                        {
                            text
                        }
                    ]
                }
            })
        });
        if (!response.ok) {
            console.error("Gemini API falhou com status:", response.status);
            return null;
        }
        const data = await response.json();
        if (data.embedding && data.embedding.values) {
            return data.embedding.values;
        }
        return null;
    } catch (error) {
        console.error("Failed to generate embedding with Gemini:", error);
        return null;
    }
}
}),
"[project]/src/actions/search-posts.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"6001eda03d383734b42166c9fafa36b61d552e9557":"searchPosts"},"",""] */ __turbopack_context__.s([
    "searchPosts",
    ()=>searchPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai/gemini.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function searchPosts(query, limit = 5) {
    if (!query || query.trim().length === 0) return [];
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Generate an embedding for the user's search query using Gemini (Julia)
    const queryEmbedding = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateEmbedding"])(query);
    // Fallback: If AI fails or doesn't return vector, use zero-vector to run keyword-only search
    const vectorStr = queryEmbedding ? `[${queryEmbedding.join(',')}]` : `[${new Array(768).fill(0).join(',')}]`;
    // 2. Call the hybrid search RPC function we created in Supabase
    const { data, error } = await supabase.rpc('search_posts_hybrid', {
        query_embedding: vectorStr,
        query_text: query,
        match_count: limit
    });
    if (error) {
        console.error("Hybrid Search Error:", error.message);
        return [];
    }
    return data || [];
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    searchPosts
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchPosts, "6001eda03d383734b42166c9fafa36b61d552e9557", null);
}),
"[project]/.next-internal/server/app/blog/[category]/[slug]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/search-posts.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$search$2d$posts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/search-posts.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/blog/[category]/[slug]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/search-posts.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "6001eda03d383734b42166c9fafa36b61d552e9557",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$search$2d$posts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchPosts"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$blog$2f5b$category$5d2f5b$slug$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$search$2d$posts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/blog/[category]/[slug]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/search-posts.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$search$2d$posts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/search-posts.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_92018d71._.js.map