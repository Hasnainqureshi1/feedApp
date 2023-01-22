import  sanityClient  from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const Client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_ID,
    dataset:'production',
    apiVersion: '2023-01-15',
    useCdn: true,
    token:process.env.REACT_APP_SANITY_TOKEN

});
const builder = ImageUrlBuilder(Client);

export const urlFor =(source) => builder.image(source);

