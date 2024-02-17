"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { IProject } from "@/app/interfaces/project.interface"

export const Logo = ({ project, classes }: { project: IProject, classes: string }) => {
    const [mounted, setMounted] = useState(false);

    const { resolvedTheme } = useTheme();
    const URL = process.env.NEXT_PUBLIC_SERVER_URI;

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <Image className={classes} src={`${URL}/project/${resolvedTheme === "dark" ? project.darkLogoUrl : project.lightLogoUrl}`} alt={project.logoAlt} width={100} height={100}></Image>
    )
}