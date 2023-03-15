export default interface Toast {
    text: string;
    type: "success" | "error" | "warning";
    id: string;
}