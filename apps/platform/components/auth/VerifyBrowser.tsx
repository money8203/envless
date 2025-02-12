import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserType } from "@/types/resources";
import { trpc } from "@/utils/trpc";
import { Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import { EmptyState, LoadingIcon } from "@/components/theme";
import { getFingerprint } from "@/lib/client";
import log from "@/lib/log";

type PageProps = {
  sessionId: string;
  user: UserType;
};

const VerifyBrowser = ({ sessionId, user }: PageProps) => {
  const { name } = user;
  const router = useRouter();
  const verifyMutation = trpc.auth.verify.useMutation({
    onSuccess: async (res: any) => {
      if (res.name === "TRPCError") {
        signOut();
        return;
      }

      router.push("/projects");
    },

    onError: (error) => {
      log("Error", error);
      signOut();
    },
  });

  useEffect(() => {
    const verify = async () => {
      const fingerprint = await getFingerprint();
      const params = {
        name,
        sessionId,
        fingerprint,
      };

      verifyMutation.mutate(params);
    };

    verify();
  });

  return (
    <EmptyState
      icon={<Shield className="m-3 mx-auto h-12 w-12" />}
      title={`Please wait...`}
      subtitle="While we verify your identity and your browser integrity."
    >
      <LoadingIcon className="h-6 w-6" />
    </EmptyState>
  );
};

export default VerifyBrowser;
