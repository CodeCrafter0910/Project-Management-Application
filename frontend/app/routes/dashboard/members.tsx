import { Loader } from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetWorkspaceDetailsQuery } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import { Search, Users, Shield, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Members = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.search = search;
    setSearchParams(params, { replace: true });
  }, [search]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  const { data, isLoading } = useGetWorkspaceDetailsQuery(workspaceId!) as {
    data: Workspace;
    isLoading: boolean;
  };

  if (!workspaceId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
          <Users className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Select a Workspace</h2>
        <p className="text-white/50 max-w-sm text-center">
          Please select a workspace from the header dropdown to view its members.
        </p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader />
      </div>
    );

  if (!data) return <div>No workspace found</div>;

  const filteredMembers = data?.members?.filter(
    (member) =>
      member.user.name.toLowerCase().includes(search.toLowerCase()) ||
      member.user.email.toLowerCase().includes(search.toLowerCase()) ||
      member.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Workspace Members
            <Badge variant="outline" className="ml-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              {filteredMembers?.length}
            </Badge>
          </h1>
          <p className="text-white/50 mt-1">Manage and view the team members in {data.name}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search members by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:bg-white/10 rounded-xl h-11 transition-all"
          />
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all">List View</TabsTrigger>
          <TabsTrigger value="board" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all">Board View</TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list" className="mt-6 animate-fade-in-up">
          <Card className="glass-dark border-white/10 shadow-xl">
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {filteredMembers?.length === 0 ? (
                  <div className="p-8 text-center text-white/50">No members found matching your search.</div>
                ) : (
                  filteredMembers?.map((member) => (
                    <div
                      key={member.user._id}
                      className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 gap-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-indigo-500/20 shadow-lg">
                          <AvatarImage src={member.user.profilePicture} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold">
                            {member.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white tracking-tight">{member.user.name}</p>
                          <p className="text-sm text-white/50">
                            {member.user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                        <Badge
                          variant="outline"
                          className={`capitalize px-3 py-1 flex items-center gap-1.5 border-white/10 ${
                            ["admin", "owner"].includes(member.role)
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          {["admin", "owner"].includes(member.role) ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board" className="mt-6 animate-fade-in-up">
          {filteredMembers?.length === 0 ? (
            <Card className="glass-dark border-white/10 shadow-xl">
              <div className="p-8 text-center text-white/50">No members found matching your search.</div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers?.map((member) => (
                <Card key={member.user._id} className="glass-dark border-white/10 shadow-xl hover-lift group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    ["admin", "owner"].includes(member.role) ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-emerald-500 to-teal-500"
                  }`} />
                  <CardContent className="p-6 flex flex-col items-center text-center pt-8">
                    <Avatar className="size-20 mb-4 border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={member.user.profilePicture} />
                      <AvatarFallback className="uppercase bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xl font-bold">
                        {member.user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                      {member.user.name}
                    </h3>

                    <p className="text-sm text-white/50 mb-5 truncate w-full px-2">
                      {member.user.email}
                    </p>

                    <Badge
                      variant="outline"
                      className={`capitalize w-full justify-center py-1.5 border-white/10 ${
                        ["admin", "owner"].includes(member.role)
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {member.role}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Members;
