
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, setInitialized, selectIsInitialized, updateUser } from "@/features/auth/authSlice";
import { useGetProfile } from "@/services/queries/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: profileData, isSuccess } = useGetProfile({ enabled: !!token });

  useEffect(() => {
    if (token) {
      dispatch(initializeAuth({ token, user: null }));
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isSuccess && profileData?.success && profileData?.data) {
        dispatch(updateUser(profileData.data));
    }
  }, [isSuccess, profileData, dispatch]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
