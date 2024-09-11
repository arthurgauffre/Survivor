import { customFetch } from "@/app/components/customFetch";

type Image = {
    id: number;
    customer_id: number;
    type: string;
    img_content: string;
};

export default async function FetchingImgOfCustomer({ accessToken, clothes, updateClothes, urlAPI}: { accessToken: string, clothes: Image[], updateClothes: (clothes: Image[]) => void, urlAPI: string }) {

    try {
        console.log(urlAPI);
        const hatData = await customFetch(
            urlAPI,
            accessToken
        );
        clothes = await hatData.json();
        updateClothes(clothes);
    } catch (error) {
        console.error(error);
    }
}