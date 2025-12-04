import { codeInput } from "@sanity/code-input"
import {
	// BookIcon,
	// CodeBlockIcon,
	DashboardIcon,
	// StackCompactIcon,
} from "@sanity/icons"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { markdownSchema } from "sanity-plugin-markdown"

import { schemaTypes } from "./schemaTypes"
// import { defineCliConfig } from 'sanity/cli'

export default defineConfig({
	name: "default",
	title: "TekBreed",
	icon: DashboardIcon,
	projectId: "3alj5od9",
	dataset: "development",
	development: {
		appId: "ljm4pzplzvu1c1so6ji09hhh",
	},
	plugins: [
		structureTool({
			//   structure: (S) =>
			//     S.list()
			//       .title("Content")
			//       .items([
			//         // Programs group
			//         S.listItem()
			//           .title("Programs")
			//           .icon(StackCompactIcon)
			//           .child(
			//             S.list()
			//               .title("Programs")
			//               .items([
			//                 S.documentTypeListItem("program").title("All Programs"),
			//                 S.documentTypeListItem("course").title("Courses"),
			//                 S.documentTypeListItem("module").title("Modules"),
			//                 S.documentTypeListItem("subModule").title("Sub Modules"),
			//                 S.documentTypeListItem("lesson").title("Lessons"),
			//                 S.documentTypeListItem("test").title("Tests"),
			//               ]),
			//           ),
			//         // Tutorials group
			//         S.listItem()
			//           .title("Tutorials")
			//           .icon(BookIcon)
			//           .child(
			//             S.list()
			//               .title("Tutorials")
			//               .items([
			//                 S.documentTypeListItem("tutorial").title("All Tutorials"),
			//                 S.documentTypeListItem("tutorialModule").title(
			//                   "Tutorial Modules",
			//                 ),
			//                 S.documentTypeListItem("tutorialLesson").title(
			//                   "Tutorial Lessons",
			//                 ),
			//               ]),
			//           ),
			//         // Articles group
			//         S.listItem()
			//           .title("Articles")
			//           .icon(BookIcon)
			//           .child(
			//             S.list()
			//               .title("Articles")
			//               .items([
			//                 S.documentTypeListItem("article").title("All Articles"),
			//               ]),
			//           ),
			//         // Shared group
			//         S.listItem()
			//           .title("Shared")
			//           .icon(BookIcon)
			//           .child(
			//             S.list()
			//               .title("Shared")
			//               .items([
			//                 S.documentTypeListItem("author").title("Authors"),
			//                 S.divider(),
			//                 S.documentTypeListItem("category").title("Categories"),
			//                 S.documentTypeListItem("tag").title("Tags"),
			//               ]),
			//           ),
			//         // Code group
			//         S.listItem()
			//           .title("Code")
			//           .icon(CodeBlockIcon)
			//           .child(
			//             S.list()
			//               .title("Code")
			//               .items([
			//                 S.documentTypeListItem("sandpack").title(
			//                   "Sandpack Templates",
			//                 ),
			//                 S.documentTypeListItem("component").title(
			//                   "React Components",
			//                 ),
			//               ]),
			//           ),
			//         // System group
			//         S.listItem()
			//           .title("System")
			//           .icon(DashboardIcon)
			//           .child(
			//             S.list()
			//               .title("System")
			//               .items([
			//                 S.documentTypeListItem("roadmap").title("Roadmap"),
			//                 S.documentTypeListItem("journey").title("Journey"),
			//                 S.documentTypeListItem("faqs").title("FAQs"),
			//                 S.documentTypeListItem("teamMember").title("Team Members"),
			//                 S.documentTypeListItem("page").title("Pages"),
			//               ]),
			//           ),
			//       ]),
		}),
		visionTool(),
		markdownSchema(),
		codeInput(),
	],

	schema: {
		types: schemaTypes,
	},
})
