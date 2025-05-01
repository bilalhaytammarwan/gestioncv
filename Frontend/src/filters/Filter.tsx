import { Job } from "../data/jobsData";
import { groupingMap } from "../data/jobsData";

export function filterByJobType({ jobList, filterValue }: { jobList: Job[], filterValue: ('Full-time' | 'Part-time' | 'Contract' | 'Remote')[] }) {
    if (filterValue.length === 0) return jobList;
    return jobList.filter((job) => filterValue.includes(job.type));
}

export function filterBySalaryRange(jobList: Job[], min: number, max: number) {
    return jobList.filter((job) => 
        job.salary[1] >= min && job.salary[0] <= max
    );
}

export function filterByJobLevel({ jobList, filterValue }: { jobList: Job[], filterValue: 'Executive' | 'Director' | 'Senior level' | 'Mid level' | 'Entry level' }) {
    return jobList.filter((job) => job.level === filterValue);
}

export function filterByCategory({ jobList, filterValue }: { jobList: Job[], filterValue: keyof typeof groupingMap }) {
    return jobList.filter((job) => {
        const keywords = groupingMap[filterValue];
        const searchText = (job.title + ' ' + job.description).toLowerCase();
        return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    });
}

export function filterByDatePosted({ jobList, daysAgo }: { jobList: Job[], daysAgo: number }) {
    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));
    return jobList.filter((job) => new Date(job.postedDate) >= cutoffDate);
}

export function filterByLocation({ jobList, location }: { jobList: Job[], location: string }) {
    if (!location) return jobList;
    return jobList.filter((job) => 
        job.location.toLowerCase().includes(location.toLowerCase())
    );
}

export function filterBySkills({ jobList, skills }: { jobList: Job[], skills: string[] }) {
    if (skills.length === 0) return jobList;
    return jobList.filter((job) => 
        skills.some(skill => 
            job.requiredSkills.some(jobSkill => 
                jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
        )
    );
}

