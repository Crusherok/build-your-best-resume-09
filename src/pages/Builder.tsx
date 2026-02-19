import TopNav from '@/components/layout/TopNav';
import PersonalInfoForm from '@/components/resume/PersonalInfoForm';
import SummaryForm from '@/components/resume/SummaryForm';
import EducationForm from '@/components/resume/EducationForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import ProjectsForm from '@/components/resume/ProjectsForm';
import SkillsForm from '@/components/resume/SkillsForm';
import LinksForm from '@/components/resume/LinksForm';
import ResumePreview from '@/components/resume/ResumePreview';
import TemplatePicker from '@/components/resume/TemplatePicker';
import ATSScoreDisplay from '@/components/resume/ATSScoreDisplay';
import { useResumeData } from '@/hooks/useResumeData';
import { useATSScore } from '@/hooks/useATSScore';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function Builder() {
  const resume = useResumeData();
  const ats = useATSScore(resume.data);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="mx-auto flex max-w-7xl gap-0 lg:gap-6 p-4">
        {/* Left: Form */}
        <div className="w-full lg:w-[45%] space-y-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Resume Builder</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resume.loadSampleData} className="h-8 text-xs">
                <Download className="mr-1 h-3 w-3" /> Load Sample
              </Button>
              <Button variant="ghost" size="sm" onClick={resume.resetData} className="h-8 text-xs text-muted-foreground">
                <RotateCcw className="mr-1 h-3 w-3" /> Reset
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            <div className="space-y-6 pb-8">
              <PersonalInfoForm data={resume.data.personal} onChange={resume.updatePersonal} />
              <Separator />
              <SummaryForm value={resume.data.summary} onChange={resume.updateSummary} />
              <Separator />
              <EducationForm data={resume.data.education} onChange={resume.updateEducation} />
              <Separator />
              <ExperienceForm data={resume.data.experience} onChange={resume.updateExperience} />
              <Separator />
              <ProjectsForm data={resume.data.projects} onChange={resume.updateProjects} />
              <Separator />
              <SkillsForm data={resume.data.skills} onChange={resume.updateSkills} />
              <Separator />
              <LinksForm data={resume.data.links} onChange={resume.updateLinks} />
            </div>
          </ScrollArea>
        </div>

        {/* Right: Preview */}
        <div className="hidden lg:block lg:w-[55%]">
          <div className="sticky top-20 space-y-4">
            <TemplatePicker
              template={resume.template}
              colorTheme={resume.colorTheme}
              onTemplateChange={resume.setTemplate}
              onColorChange={resume.setColorTheme}
            />
            <ATSScoreDisplay result={ats} />
            <ScrollArea className="h-[calc(100vh-22rem)]">
              <ResumePreview data={resume.data} template={resume.template} colorTheme={resume.colorTheme} />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
