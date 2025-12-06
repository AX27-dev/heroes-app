import { Link } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { SlashIcon } from 'lucide-react';

type Breadcrumbb = {
  label: string;
  to: string;
};

type Props = {
  currentPage: string;
  breadcrumbs?: Breadcrumbb[];
};

export const CustomBreadcrumb = ({ currentPage, breadcrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="my-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((breadcrumb) => (
          <div className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbLink asChild>
                <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem className="text-black">{currentPage}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
