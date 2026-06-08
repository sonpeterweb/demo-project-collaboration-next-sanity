"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type AdminContactSubmissionRow = {
  _id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  submittedAt: string;
  status?: string;
};

type ContactTableProps = {
  submissions: AdminContactSubmissionRow[];
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function formatStatus(status?: string) {
  if (!status) return "New";
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ContactTable({ submissions }: ContactTableProps) {
  if (submissions.length === 0) {
    return (
      <p className="text-muted-foreground rounded-lg border p-8 text-center text-sm">
        No contact submissions yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission._id}>
            <TableCell className="font-medium">{submission.name}</TableCell>
            <TableCell>{submission.email}</TableCell>
            <TableCell>{submission.company}</TableCell>
            <TableCell className="max-w-sm whitespace-normal">
              {submission.message}
            </TableCell>
            <TableCell>{formatDate(submission.submittedAt)}</TableCell>
            <TableCell>{formatStatus(submission.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
