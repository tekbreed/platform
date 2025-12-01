import React from "react"

import { autocompletion } from "@codemirror/autocomplete"
import { SandpackCodeEditor } from "@codesandbox/sandpack-react"

interface EditorProps {
	showInlineErrors?: boolean
	showLineNumbers?: boolean
	showTabs?: boolean
}

export const Editor = React.memo(function Editor({
	showInlineErrors,
	showLineNumbers,
	showTabs,
}: EditorProps) {
	return (
		<SandpackCodeEditor
			className="h-full w-full rounded-none border-none"
			closableTabs
			extensions={[autocompletion()]}
			showInlineErrors={showInlineErrors}
			showLineNumbers={showLineNumbers}
			showReadOnly
			showTabs={showTabs}
			wrapContent
		/>
	)
})
