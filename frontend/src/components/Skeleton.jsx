import React from 'react';

export const ProjectDetailsSkeleton = () => (
  <div className="animate-pulse space-y-4 max-w-4xl mx-auto p-4">
    <div className="h-64 bg-gray-700 rounded-xl w-full"></div>
    <div className="h-8 bg-gray-700 rounded w-1/2"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
  </div>
);

export const ProjectSkeleton = () => (
  <div className="animate-pulse flex flex-col space-y-4">
    <div className="h-48 bg-gray-700 rounded-xl w-full"></div>
    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

export const ExperienceSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-20 bg-gray-700 rounded-xl w-full"></div>
    <div className="h-20 bg-gray-700 rounded-xl w-full"></div>
  </div>
);

export const SkillSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-gray-700 rounded-full w-full"></div>
    <div className="h-10 bg-gray-700 rounded-full w-full"></div>
  </div>
);
