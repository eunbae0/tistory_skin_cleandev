import { Story, Meta } from "@storybook/html";
import { createButton, ButtonProps } from "./TagButton";

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
	title: "Example/Button",
	// More on argTypes: https://storybook.js.org/docs/html/api/argtypes
	argTypes: {
		label: { control: "text" },
		href: { control: "text" },
	},
} as Meta;

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: Story<ButtonProps> = (args) => {
	// You can either use a function to create DOM elements or use a plain html string!
	// return `<div>${label}</div>`;
	return createButton(args);
};

export const TagButton = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
TagButton.args = {
	label: "[##_tag_name_##]",
	href: "[##_tag_link_##]",
};
