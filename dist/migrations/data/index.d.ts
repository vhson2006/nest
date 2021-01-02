declare const _default: () => {
    account: {
        name: string;
        email: string;
        phone: string;
        address: string;
        aboutUs: string;
        wcode: string;
        contactUsImage: string;
    }[];
    home: {
        account: string;
        data: {
            jumbotronTitle: string;
            mainTitle: string;
            mainParagraph: string;
            sideParagraph: string;
            subTitle: string;
            subParagraph: string;
        }[];
    }[];
    service: {
        account: string;
        data: {
            jumbotronTitle: string;
            mainTitle: string;
            serviceImage: string;
        }[];
    }[];
    product: {
        account: string;
        data: {
            title: string;
            description: string;
            tags: string;
            imageId: string;
        }[];
    }[];
};
export default _default;
