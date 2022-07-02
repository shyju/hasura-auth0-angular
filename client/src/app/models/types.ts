export type Skill = {
    skill_id: string;
    skill_name: string;
    exprience: number;
}

export type Query = {
    skills: Skill[]
}