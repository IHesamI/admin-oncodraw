import { Course, Rate, UserProgress } from "../types";
import { mapDifficulty } from "../utils/constants";

export const modifyCourse = (item: Course) => {
    item.instructor = item.instructors && item.instructors.length ? item.instructors.map(item => item.username).join(', ') : '';
    item.price = parseInt(item.price);
    item.mappedDiffiuclty =
        Object.values(mapDifficulty).find(mappDiff => mappDiff.predicate(item.difficulty))!;
    item.rating = item.rates ? parseInt(((item.rates as Rate[])
        .reduce((sum, current) => sum + current.rateCount, 0) / (Math.max(item.rates.length, 1))).toFixed(2))
        : -1;
    return item

}

export const modifyProgress = (data: UserProgress): UserProgress => {
    data.subscriptions = data.subscriptions.map(subs => {
        subs.courses = subs.courses!.map(course => {
            course.totalParts = course.modules.reduce((sum, module) => sum + module.parts.count, 0)
            course.totalProgresses = course.progresses.length ? course.progresses.reduce((sum, progress) => sum + progress.parts.count, 0) : 0;
            return course;
        })
        return subs
    })
    return data;

}

export const modifyPartsForProgress = (data: Course): Course => {
    if (data.progresses.length) {
        data.progresses.forEach(({ parts }) => {
            data.modules = data.modules.map(module => {
                module.parts = module.parts.map(part => {
                    part.isCompleted = Boolean(parts.find(completedPart => completedPart.id == part.id));
                    return part;
                })
                return module;
            })
        })
    }
    return data;
}