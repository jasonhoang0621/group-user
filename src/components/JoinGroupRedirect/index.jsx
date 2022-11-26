import { notification } from "antd";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAcceptInvite } from "src/api/group";

const JoinGroupRedirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: joinGroup } = useAcceptInvite(id);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const handleAccept = async () => {
      if (token && id) {
        console.log(id);
        const result = await joinGroup();
        if (result?.errorCode) {
          notification.error({
            message: result?.data,
          });
        } else {
          notification.success({
            message: result?.data,
          });
          navigate(`/group/${result?.data?.groupId}`);
        }
      } else {
        window.location.href = "/login";
      }
    };
    handleAccept();
  }, [id, joinGroup]);

  return <div>JoinGroupRedirect</div>;
};

export default JoinGroupRedirect;
