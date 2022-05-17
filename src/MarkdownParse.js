import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkEmoji from 'remark-emoji'


  const mdparser = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(rehypeHighlight)
    .use(remarkEmoji)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)

export default mdparser