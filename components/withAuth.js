import { getSession } from "next-auth/react";
import prisma from "./prisma";

export default function withAuth(gssp) {
    return async (context) => {
        const session = await getSession(context);

        if (!session) {
            return {
                redirect: {
                    destination: '/',
                },
            };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return {
                redirect: {
                    destination: '/',
                },
            };
        }

        const gsspData = await gssp(context);

        return {
            props: {
                ...gsspData.props,
                user,
            },
        };
    };
}
