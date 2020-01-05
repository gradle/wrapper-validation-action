// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITBUF_H
#define GITBUF_H
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

#include "../include/git_buf_converter.h"

using namespace node;
using namespace v8;

class GitBuf;

struct GitBufTraits {
  typedef GitBuf cppClass;
  typedef git_buf cType;

  static const bool isDuplicable = false;
  static void duplicate(git_buf **dest, git_buf *src) {
     Nan::ThrowError("duplicate called on GitBuf which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_buf *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_buf_dispose(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitBuf : public
  NodeGitWrapper<GitBufTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitBufTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                   

  private:
    GitBuf()
      : NodeGitWrapper<GitBufTraits>(
           "A new GitBuf cannot be instantiated."
       )
    {}
    GitBuf(git_buf *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitBufTraits>(raw, selfFreeing, owner)
    {}
    ~GitBuf();
                       static NAN_METHOD(Ptr);
    static NAN_METHOD(Asize);
    static NAN_METHOD(Size);

    static NAN_METHOD(ContainsNul);

    static NAN_METHOD(Dispose);

    static NAN_METHOD(Grow);

    static NAN_METHOD(IsBinary);

    static NAN_METHOD(Set);
};

#endif
