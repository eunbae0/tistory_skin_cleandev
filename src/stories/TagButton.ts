export interface ButtonProps {
	label: string;
	href: string;
}
export const createButton = ({ label, href }: ButtonProps) => {
	const li = document.createElement("li");
	const a = document.createElement("a");
	a.innerText = label;
	a.href = href;
	li.className =
		"m-1 px-2 py-1 border border-gray-900 dark:border-gray-500 group rounded-full bg-slate-50 dark:bg-slate-700 text-center hover:bg-gray-900 hover:text-white dark:hover:bg-white ease-out duration-300";
	a.className = "[##_tag_class_##] dark:group-hover:text-black";

	li.appendChild(a);
	return li;
};
