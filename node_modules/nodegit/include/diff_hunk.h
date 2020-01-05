// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFHUNK_H
#define GITDIFFHUNK_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitDiffHunk;

struct GitDiffHunkTraits {
  typedef GitDiffHunk cppClass;
  typedef git_diff_hunk cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_hunk **dest, git_diff_hunk *src) {
     Nan::ThrowError("duplicate called on GitDiffHunk which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_diff_hunk *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitDiffHunk : public
  NodeGitWrapper<GitDiffHunkTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffHunkTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffHunk()
      : NodeGitWrapper<GitDiffHunkTraits>(
           "A new GitDiffHunk cannot be instantiated."
       )
    {}
    GitDiffHunk(git_diff_hunk *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffHunkTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffHunk();
     static NAN_METHOD(OldStart);
    static NAN_METHOD(OldLines);
    static NAN_METHOD(NewStart);
    static NAN_METHOD(NewLines);
    static NAN_METHOD(HeaderLen);
    static NAN_METHOD(Header);
};

#endif
