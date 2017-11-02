// Generated using typescript-generator version 1.25.322 on 2017-10-28 15:19:22.
export class TimeStampedEntity {
    createTime: Date;
    lastModified: Date;
}

export class Answer extends TimeStampedEntity {
    id: string;
    question: Question;
    user: User;
    recommendation: Recommendation;
    fileId: number;
    answerRecommendation: string;
    createdDate: Date;
}

export class AnswerRequestVO {
    answer: string;
    question: string;
    user: string;
}

export class AutocompletePrediction {
    description: string;
    placeId: string;
    types: string[];
    terms: Term[];
    matchedSubstrings: MatchedSubstring[];
    structuredFormatting: AutocompleteStructuredFormatting;
}

export class Question extends TimeStampedEntity {
    id: string;
    query: string;
    locationName: string;
    latitude: string;
    longitude: string;
    userId: string;
}

export class User extends TimeStampedEntity {
    id: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    deviceId: string;
    registrationId: string;
}

export class Recommendation {
    id: number;
    description: string;
    upvoteCounter: number;
    createdDate: Date;
    lastModfiedDate: Date;
    views: number;
}



export class Term {
    offset: number;
    value: string;
}

export class MatchedSubstring {
    length: number;
    offset: number;
}

export class AutocompleteStructuredFormatting {
    mainText: string;
    mainTextMatchedSubstrings: MatchedSubstring[];
    secondaryText: string;
}
