"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Briefcase, ExternalLink, FileText, Plus, Pencil, Trash2, MoreVertical, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useJobs, JobPosting } from "@/hooks/use-jobs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function CareersPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Page Settings State
  const [careersInfo, setCareersInfo] = useState({
    pageTitle: "",
    pageDescription: "",
    sectionTitle: "",
    sectionDescription: "",
  });

  // Job Management State
  const { jobs, isLoading: jobsLoading, createJob, updateJob, deleteJob } = useJobs();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    requirements: "",
    driveLink: "",
    isActive: true,
  });

  // Fetch careers page information
  useEffect(() => {
    const fetchCareersInfo = async () => {
      try {
        const response = await fetch("/api/admin/careers");
        const result = await response.json();

        if (result.success && result.data) {
          setCareersInfo({
            ...careersInfo,
            ...result.data,
          });
        }
      } catch (error) {
        console.error("Error fetching careers info:", error);
        toast({
          title: "Error",
          description: "Failed to load careers information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareersInfo();
  }, [toast]);

  const handleSavePageSettings = async () => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/admin/careers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(careersInfo),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Page Settings Updated",
          description: "Careers page information has been successfully saved.",
        });
      } else {
        throw new Error(result.message || "Failed to save careers information");
      }
    } catch (error) {
      console.error("Error saving careers info:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save careers information",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePageInputChange = (field: string, value: string) => {
    setCareersInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Job Functions
  const resetJobForm = () => {
    setJobForm({
      title: "",
      description: "",
      requirements: "",
      driveLink: "",
      isActive: true,
    });
    setEditingJob(null);
  };

  const handleOpenJobModal = (job?: JobPosting) => {
    if (job) {
      setEditingJob(job);
      setJobForm({
        title: job.title,
        description: job.description,
        requirements: job.requirements || "",
        driveLink: job.driveLink,
        isActive: job.isActive,
      });
    } else {
      resetJobForm();
    }
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async () => {
    try {
      if (!jobForm.title || !jobForm.description || !jobForm.driveLink) {
        toast({
          title: "Missing Fields",
          description: "Title, Description, and Drive Link are required.",
          variant: "destructive",
        });
        return;
      }

      let result;
      if (editingJob) {
        result = await updateJob(editingJob._id, jobForm);
      } else {
        result = await createJob(jobForm);
      }

      if (result.success) {
        toast({
          title: editingJob ? "Job Updated" : "Job Created",
          description: `Job posting has been successfully ${editingJob ? "updated" : "created"}.`,
        });
        setIsJobModalOpen(false);
        resetJobForm();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save job",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      const result = await deleteJob(id);
      if (result.success) {
        toast({
          title: "Job Deleted",
          description: "Job posting has been successfully deleted.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete job",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014a74] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full overflow-x-hidden p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#014a74]">Careers Manager</h1>
          <p className="text-gray-600 mt-2">Manage careers page content and job listings</p>
        </div>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="jobs" className="data-[state=active]:bg-[#014a74] data-[state=active]:text-white">
            Job Listings
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#014a74] data-[state=active]:text-white">
            Page Settings
          </TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#014a74]">Current Openings</h2>
            <Button onClick={() => handleOpenJobModal()} className="bg-[#f58420] hover:bg-[#d9731a] text-white">
              <Plus className="h-4 w-4 mr-2" /> Add New Job
            </Button>
          </div>

          <div className="grid gap-4">
            {jobsLoading ? (
               <div className="text-center py-10">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <Card className="text-center py-10">
                <CardContent>
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No job postings found.</p>
                  <Button variant="link" onClick={() => handleOpenJobModal()} className="text-[#014a74]">
                    Create your first job posting
                  </Button>
                </CardContent>
              </Card>
            ) : (
              jobs.map((job) => (
                <Card key={job._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-[#014a74]">{job.title}</h3>
                        <Badge variant={job.isActive ? "default" : "secondary"} className={job.isActive ? "bg-green-600" : "bg-gray-400"}>
                          {job.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{job.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                         {/* Removed Location and Type here as they are no longer in schema */}
                         {/* You might want to display truncated requirements or just date */}
                         <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button variant="outline" size="sm" onClick={() => window.open(job.driveLink, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenJobModal(job)}>
                         <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Page Settings Tab */}
        <TabsContent value="settings">
          <div className="flex justify-end mb-4">
             <Button onClick={handleSavePageSettings} disabled={isSaving} className="bg-[#014a74] hover:bg-[#012d47] text-white">
              {isSaving ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Settings</>}
            </Button>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Page Title</Label>
                  <Input 
                    value={careersInfo.pageTitle} 
                    onChange={(e) => handlePageInputChange("pageTitle", e.target.value)} 
                    placeholder="Join Our Team" 
                  />
                </div>
                <div>
                  <Label>Page Description</Label>
                  <Textarea 
                    value={careersInfo.pageDescription} 
                    onChange={(e) => handlePageInputChange("pageDescription", e.target.value)} 
                    placeholder="Brief introduction..."
                    rows={4} 
                  />
                </div>
              </CardContent>
            </Card>
            
             <Card>
              <CardHeader>
                <CardTitle>Additional Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input 
                    value={careersInfo.sectionTitle} 
                    onChange={(e) => handlePageInputChange("sectionTitle", e.target.value)} 
                  />
                </div>
                <div>
                  <Label>Section Description</Label>
                  <Textarea 
                    value={careersInfo.sectionDescription} 
                    onChange={(e) => handlePageInputChange("sectionDescription", e.target.value)} 
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Job Modal */}
      <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job Posting" : "Add New Job Posting"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Job Title *</Label>
              <Input 
                value={jobForm.title} 
                onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                placeholder="e.g. Senior Architect"
              />
            </div>
            
            <div>
              <Label>Description *</Label>
              <Textarea 
                value={jobForm.description} 
                onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                placeholder="Job role description..."
                rows={4}
              />
            </div>

             <div>
              <Label>Requirements</Label>
              <Textarea 
                value={jobForm.requirements} 
                onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                placeholder="Key qualifications and skills..."
                rows={4}
              />
            </div>

            <div>
              <Label>Application Drive Link *</Label>
              <Input 
                 value={jobForm.driveLink} 
                 onChange={(e) => setJobForm({...jobForm, driveLink: e.target.value})}
                 placeholder="https://drive.google.com/..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                checked={jobForm.isActive}
                onCheckedChange={(checked) => setJobForm({...jobForm, isActive: checked})}
              />
              <Label>Active (Visible on public site)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsJobModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveJob} className="bg-[#014a74] text-white">
              {editingJob ? "Update Job" : "Create Job"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
