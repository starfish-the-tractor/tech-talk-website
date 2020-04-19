declare module 'mdast-util-to-hast' {
    import { Node } from 'unist'
    export type Option = {
        allowDangerousHTML?: boolean
        commonmark?: boolean
        handlers?: any
    }
    export default function toHast(node: Node, options: Option)
}

declare module 'remark-rehype' {
    import { Attacher } from 'unified'
    import { Node } from 'unist'
    import { Option as HastOption } from 'mdast-util-to-hast'
    export type Option = {
        run(node: Node, file: any, done: any): void
    }
    const remark2rehype: Attacher<[Option?, HastOption?] | [HastOption?]>
    export default remark2rehype
}

declare module 'rehype-highlight' {
    import { Settings, Attacher } from 'unified'
    export type Option = {
        prefix?: string
        subset?: boolean | string[]
        ignoreMissing?: boolean
        plainText?: string[]
        aliases?: { [x: any]: string | string[] }
        languages?: string | Function
    }
    const highlight: Attacher<[Option?]>
    export default highlight
}

declare module 'rehype-react' {
    import { Settings, Attacher } from 'unified'
    import React from 'react'
    export type Option = {
        createElement?: typeof React.createElement
        Fragment?: typeof React.Fragment
        components?: { [x: string]: React.ComponentType }
    }
    const rehype2react: Attacher<[Option?]>
    export default rehype2react
}
